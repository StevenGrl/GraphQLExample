import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {useQuery, useSubscription} from '@apollo/client';
import {GET_ARTICLES, ARTICLES_SUBSCRIPTION} from '../../../../graphql/requests/article';
import { useEffect, useState } from 'react';

export default function Index({auth}) {
    const [articles, setArticles] = useState([]);
    const {loading, error, data} = useQuery(GET_ARTICLES);

    const { data: dataSubscription, loading: loadingSubscription } = useSubscription(
        ARTICLES_SUBSCRIPTION
    );

    useEffect(() => {
        if(data && data.articles) setArticles(data.articles)
    }, [data]);

    useEffect(() => {
        console.log('dataSubscription', dataSubscription)
    }, [dataSubscription]);

    useEffect(() => {
        console.log('loadingSubscription', loadingSubscription)
    }, [loadingSubscription]);

    window.myEcho.channel(`articles`)
        .listen('.articleAdded', (e) => {
            console.log('listening article added');
            console.log(e.article);
            setArticles([...articles, e.article])
        });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Articles</h2>}
        >
            <Head title="Articles"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="text-lg font-bold text-center mb-10">Liste des articles</p>
                            {loading ? (<>En cours de chargement...</>) : (<>
                                {error ? (
                                    <div>
                                        {error.graphQLErrors.map(({ message }, i) => (
                                            <span key={i}>{message}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {articles.length > 0 && articles.map(({id, name, description, image, author}) => (
                                            <div key={id} className="grid grid-cols-3 gap-4 mb-3">
                                                <span className="col-span-1">{name}</span>
                                                <span className="col-span-1">by {parseInt(author.id) === auth.user.id ? 'You' : author.name}</span>
                                                <span className="col-span-1">
                                                    <Link className="text-blue-600" href={route('articles_show', id)}>
                                                        Afficher cet article !
                                                    </Link>
                                                </span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
