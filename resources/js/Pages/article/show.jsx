import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import {useQuery, useMutation} from '@apollo/client';
import {GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES} from '../../../../graphql/requests/article';
import {useState, useEffect} from 'react';
import { Button } from "@material-tailwind/react";

export default function Show({auth}) {
    const [displayEdit, setDisplayEdit] = useState(false);
    const { id } = route().params;
    const {loading, error, data} = useQuery(GET_ARTICLE, { variables: { id } });

    const [deleteMutation, { loading: loadingDelete, error: errorDelete, data: dataDelete }] = useMutation(DELETE_ARTICLE, {
        refetchQueries: [
            {query: GET_ARTICLES},
        ]
    });

    useEffect(() => {
        if(data && data.article && auth.user.id === parseInt(data.article.author.id)) setDisplayEdit(true)
    }, [data])

    const deleteAction = () => {
        deleteMutation({ variables: { id: data.article.id }})
        router.get(route('articles'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Article</h2>}
        >
            <Head title="Articles"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="text-lg font-bold text-center">{loading ? 'Nom de l\'article' : 'article.name' }</p>
                            {loading ? (<>En cours de chargement...</>) : (<>
                                {error ? (
                                    <div>
                                        {error.message}
                                    </div>
                                ) : (
                                    <div key={data.article.id} className="grid grid-cols-5 gap-4">
                                        <img src={`/img/${data.article.image}`} alt=""/>
                                        <br/>
                                        <p>{data.article.description}</p>
                                        {displayEdit && (
                                            <>
                                                <Link className="text-blue-600" href={route('articles_edit', id)}>
                                                    Editer
                                                </Link>
                                                <Button color="red" onClick={deleteAction}>
                                                    Supprimer
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
