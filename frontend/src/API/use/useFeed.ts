import {useAPI} from '../../AppState/AppState';
import {useEffect, useState} from 'react';
import {PostInfo} from '../../Types/PostInfo';

export function useFeed(site: string, isPosts: boolean, page: number, perpage: number) {
    const api = useAPI();
    const [posts, setPosts] = useState<PostInfo[]>();
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [error, setError] = useState<string>();

    useEffect(() => {
        console.log('feed request');
        setLoading(true);
        if (isPosts) {
            api.post.feedPosts(site, page, perpage)
                .then(result => {
                    setError(undefined);
                    setLoading(false);
                    setPosts(result.posts);
                    const pages = Math.floor((result.total - 1) / perpage) + 1;
                    setPages(pages);
                })
                .catch(error => {
                    console.log('FEED ERROR', error);
                    setError('Не удалось загрузить ленту постов');
                });
        }
        else {
            api.post.feedSubscriptions(page, perpage)
                .then(result => {
                    setError(undefined);
                    setLoading(false);
                    setPosts(result.posts);
                    const pages = Math.floor((result.total - 1) / perpage) + 1;
                    setPages(pages);
                })
                .catch(error => {
                    console.log('FEED ERROR', error);
                    setError('Не удалось загрузить ленту постов');
                });
        }
    }, [site, isPosts, page, api.post, perpage]);

    return { posts, loading, pages, error };
}