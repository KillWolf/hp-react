import React, { useEffect, useState } from 'react';
import axios from '../../axios-instances/axios-firebase'
import classes from './Recommendations.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import Aux from '../../hoc/Aux';
import Spinner from '../UI/Spinner/Spinner';
import HeroImage from '../../utility/HeroImage/HeroImage'

const Credentials = () => {

    const rootClasses = [globalClasses.Panel, classes.Recommendations].join(' ');

    const [recommendations, setRecommendations] = useState({ recommendations: [], loading: true, error: false })
    useEffect(() => {
        axios.get('/recommendations.json')
            .then(response => {
                const entries = Object.entries(response.data);
                const recommendationArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1] }
                })
                setRecommendations({ recommendations: recommendationArray, loading: false, error: false })
            })
            .catch(error => {
                setRecommendations({recommendations: [], loading: false, error: true})
            })
    }, [])

    let content = <Spinner />;

    if (recommendations.error) {
        content = <p>Der opstod et problem. Prøv igen.</p>
    } else if (!recommendations.loading) {
        content = (
            <Aux>
                {recommendations.recommendations.map(recommendation => (
                    <Aux key={recommendation.id}>
                        <h2>{recommendation.title}</h2>
                        <div className={classes.Blockquote}>{recommendation.content}</div>
                        <cite>{recommendation.author}</cite>
                    </Aux>
                ))}
            </Aux>
        )
    }

    return (
        <div>
            <HeroImage headerString="RECOMMENDATIONS" imageName="Mountain" />
            <div className={rootClasses}>
                {content}
            </div>
        </div>
    )
};

export default Credentials;