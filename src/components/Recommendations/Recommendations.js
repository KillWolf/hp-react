import React, { useEffect, useState } from 'react';
import axios from '../../axios-instances/axios-firebase'
import classes from './Recommendations.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import Aux from '../../hoc/Aux';
import Spinner from '../UI/Spinner/Spinner';
import { ErrorMessage } from '../../utility/Global/Error/ServiceHandling/Error/ErrorHandling';

const Recommendations = () => {

    const rootClasses = [globalClasses.Panel, classes.Recommendations].join(' ');
    const [recommendations, setRecommendations] = useState({ recommendations: [], loading: true, error: false })

    const getRecommendations = () => {
        setRecommendations({loading: true, recommendations: [], error: false})
        axios.get('/recommendations.json')
            .then(response => {
                const entries = Object.entries(response.data);
                const recommendationArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1] }
                })
                setRecommendations({ recommendations: recommendationArray, loading: false, error: false })
            })
            .catch(error => {
                setRecommendations({ recommendations: [], loading: false, error: true })
            })
    }
    useEffect(() => {
        getRecommendations();
    }, [])

    let content = <div className={rootClasses}><Spinner /></div>;

    if (recommendations.error) {
        content = <div className={rootClasses}>{ErrorMessage('Der opstod en fejl med at hente anbefalinger.', {message: 'Prøv igen', method: getRecommendations })}</div>
    } else if (!recommendations.loading) {
        content = (
            <Aux>
                {recommendations.recommendations.map(recommendation => (
                    <div className={rootClasses} key={recommendation.id}>
                        <h2>{recommendation.title}</h2>
                        <div className={classes.Blockquote}>{recommendation.content}</div>
                        <cite>{recommendation.author}</cite>
                    </div>
                ))}
            </Aux>
        )
    }

    return (
        <div>
            <h1 className={globalClasses.Header}>RECOMMENDATIONS</h1>
            {content}
        </div>
    )
};

export default Recommendations;