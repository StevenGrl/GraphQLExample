import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Input, Button} from "@material-tailwind/react";
import {useMutation, useQuery} from "@apollo/client";
import {UPDATE_ARTICLE, GET_ARTICLES, GET_ARTICLE} from "../../../../graphql/requests/article";
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

export default function Edit({auth}) {
    const {id} = route().params;

    const {loading: loadingArticle, error: errorArticle, data: dataArticle} = useQuery(GET_ARTICLE, {variables: {id}});

    const [nom, setNom] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [errorName, setErrorName] = useState(false);
    const [errorImage, setErrorImage] = useState(false);

    const [updateArticle, {data, loading, error}] = useMutation(UPDATE_ARTICLE, {
        refetchQueries: [
            {query: GET_ARTICLES},
        ]
    });
    const notify = () => !error && toast("Bien modifié");
    const sendData = async () => {
        resetErrors()
        if (nom === '' || image === '') {
            displayErrors()
            return;
        }
        updateArticle({variables: {id: dataArticle.article.id, name: nom, image, description}})
        notify()
        resetFields()
    }

    const changeNom = ($e) => {
        setNom($e.target.value)
    }

    const changeImage = ($e) => {
        setImage($e.target.value)
    }

    const changeDescription = ($e) => {
        setDescription($e.target.value)
    }

    const resetFields = () => {
        setNom('');
        setImage('');
        setDescription('');
    }

    const resetErrors = () => {
        setErrorName(false);
        setErrorImage(false);
    }

    const displayErrors = () => {
        if (nom === '') setErrorName(true);
        if (image === '') setErrorImage(true);
    }

    useEffect(() => {
        if(dataArticle && dataArticle.article.id) {
            setNom(dataArticle.article.name);
            setImage(dataArticle.article.image);
            setDescription(dataArticle.article.description);
        }
    }, [dataArticle])

    if (error) return `Erreur : ${error.message}`;

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
                            <p className="text-lg font-bold text-center mb-10">Edition article</p>
                            {loadingArticle ? (<>En cours de chargement...</>) : (
                                <>
                                    {errorArticle ? (
                                        <div>
                                            {errorArticle.message}
                                        </div>
                                    ) : (
                                        <>
                                            {nom && image && description && (
                                                <div className="grid grid-cols-3 gap-4 mb-10">
                                                    <div className="w-72">
                                                        {errorName ?
                                                            <Input label="Nom" error onChange={changeNom} value={nom}
                                                                   required/>
                                                            :
                                                            <Input label="Nom" onChange={changeNom} value={nom} required/>
                                                        }
                                                    </div>
                                                    <div className="w-72">
                                                        {errorImage ?
                                                            <Input label="Image" error onChange={changeImage} value={image}
                                                                   required/>
                                                            :
                                                            <Input label="Image" onChange={changeImage} value={image}
                                                                   required/>
                                                        }
                                                    </div>
                                                    <div className="w-72">
                                                        <Input label="Description" value={description}
                                                               onChange={changeDescription}/>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="text-center">
                                                {loading ? (
                                                    <Button color="green" disabled>Valider</Button>
                                                ) : (
                                                    <Button color="green" onClick={sendData}>Mettre à jour</Button>
                                                )}
                                            </div>
                                        </>)}
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
