import { Link } from 'react-router-dom'

export function StayPreview({ stay}) {
    const imgUrl = stay.imgUrls[0]
    return (
            <Link to={`/stay/${stay._id}`} className="clean-link">
                <div className="stay-preview-card">
                    <img src={imgUrl}/>
                    <div className="stay-preview-info">
                        <h3>{stay.name}</h3>
                        <h3 className="stay-price"><span >${stay.price}</span> / night</h3>
                    </div>
                </div>
            </Link>
    )
}