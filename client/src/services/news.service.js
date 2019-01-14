import axios from 'axios';

class NewsService {
    static async getNews(sourcesArray) {
        let request = await axios.get('/api/news', {
            params: {
                sources: sourcesArray
            }
        })
        return request.data
    };

    static async searchNews(query) {
        let request = await axios.get('/api/news/:search', {
            params: {
                queryString: query
            }
        })
        return request.data
    };
};

export default NewsService;
