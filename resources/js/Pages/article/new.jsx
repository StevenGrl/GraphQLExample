import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { Input, Button, Alert } from "@material-tailwind/react";
import { useMutation } from "@apollo/client";
import { ADD_ARTICLE, GET_ARTICLES } from "../../../../graphql/requests/article";
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function New({auth}) {
    const [nom, setNom] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [addArticle, { data, loading, error }] = useMutation(ADD_ARTICLE, {
        refetchQueries: [
            {query: GET_ARTICLES},
        ]
    });
    const notify = () => toast("Bien enregistré");
    const sendData = async () => {
        resetErrors()
        if(nom === '' || image === '') {
            console.log('error', nom, 'image', image)
            displayErrors()
            return;
        }
        addArticle({ variables: { name: nom, image, description, author_id: auth.user.id }})
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
        setNom('')
        setImage('')
        setDescription('')
    }

    const resetErrors = () => {
        setErrorName(false)
        setErrorImage(false)
    }

    const displayErrors = () => {
        if(nom === '') setErrorName(true)
        if(image === '') setErrorImage(true)
    }

    if(error) return `Erreur : ${error.message}`;

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
                            <p className="text-lg font-bold text-center mb-10">Nouvel article</p>
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="w-72">
                                    {errorName ?
                                        <Input label="Nom" error onChange={changeNom} required />
                                        :
                                        <Input label="Nom" onChange={changeNom} required />
                                    }
                                </div>
                                <div className="w-72">
                                    {errorImage ?
                                        <Input label="Image" error onChange={changeImage} required />
                                        :
                                        <Input label="Image" onChange={changeImage} required />
                                    }
                                </div>
                                <div className="w-72">
                                    <Input label="Description" onChange={changeDescription}/>
                                </div>
                            </div>
                            <div className="text-center">
                                {loading ? (
                                    <Button color="green" disabled>Valider</Button>
                                ) : (
                                    <Button color="green" onClick={sendData}>Valider</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
