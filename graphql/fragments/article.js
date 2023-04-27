import { gql } from '@apollo/client';

export const CORE_ARTICLE_FIELDS = gql`    
    fragment CoreArticleFields on Article {
        id
        name
        image
        description
        author {
            id
            name
        }
        created_at
        updated_at
    }
`;