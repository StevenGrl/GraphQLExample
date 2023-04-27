import {gql} from '@apollo/client';
import {CORE_ARTICLE_FIELDS} from '../fragments/article';

export const GET_ARTICLES = gql`
    ${CORE_ARTICLE_FIELDS}
    query GetArticles {
        articles {
            ...CoreArticleFields
        }
    }
`;

export const GET_ARTICLE = gql`
    ${CORE_ARTICLE_FIELDS}
    query GetArticle($id: ID!) {
        article(id: $id) {
            ...CoreArticleFields
        }
    }
`;

export const ADD_ARTICLE = gql`
    ${CORE_ARTICLE_FIELDS}
    mutation AddArticle($name: String!, $image: String!, $description: String!, $author_id: Int!) {
        addArticle(name: $name, image: $image, description: $description, author_id: $author_id) {
            ...CoreArticleFields
        }
    }
`;

export const UPDATE_ARTICLE = gql`
    mutation UpdateArticle($id: ID!, $name: String!, $image: String!, $description: String!) {
        updateArticle(id: $id, name: $name, image: $image, description: $description) {
            id
            name
            image
            description
        }
    }
`;

export const DELETE_ARTICLE = gql`
    mutation DeleteArticle($id: ID!) {
        deleteArticle(id: $id) {
            id
            name
            image
            description
        }
    }
`;

export const ARTICLES_SUBSCRIPTION = gql`
    ${CORE_ARTICLE_FIELDS}
    subscription OnArticleAdded {
        articleAdded {
            ...CoreArticleFields
        }
    }
`;