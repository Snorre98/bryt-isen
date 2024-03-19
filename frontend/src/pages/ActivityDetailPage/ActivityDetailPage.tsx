import {getActivity, getReviews} from "~/api";
import {useEffect, useState} from "react";
import {ActivityDto, ReviewDto} from "~/dto";
import {useParams} from "react-router-dom";
import {PageWrapper} from "~/components/PageWrapper";
import ReviewComp from "~/components/ReviewComp";
import "./ActivityDetailPage.css"
import {Button} from "react-bootstrap";

export function ActivityDetailPage(){
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityDto>()
  const [reviews, setReviews] = useState<ReviewDto[]>()

  useEffect(() => {
    getActivity(id).then((response) =>{
      setActivity(response)
    })
    getReviews().then((response)=>{
      setReviews(response)
    })
  }, [id]);

  const filteredReviews = reviews?.filter((review)=> activity.id === review.activity)

  return(
    <PageWrapper>
      <div className="container">
        <div className="subcontainer">
          <h1 className="header">{activity?.title}</h1>
          <hr/>
          <Button variant="warning" size="sm">Timer</Button>
          <Button variant="warning" size="sm">Endre aktivitet</Button>
          <Button variant="warning" size="sm">Slett aktivitet</Button>
          <Button variant="warning" size="sm">Rapporter</Button>
          <Button variant="warning" size="sm">Rapporter</Button>
          <hr/>
          <span className="bold-span">Kategori</span>
          <h6 className="header">{activity?.activity_type}</h6>
          <span className="bold-span">Detaljer</span>
          <p>{activity?.details}</p>
          <span className="bold-span">Regler</span>
          <p>{activity?.activity_rules}</p>


        </div>
        <div className="subcontainer" style={{padding: "0.5rem", border: "1px solid black", borderRadius: "0.5rem"}}>
          <h1 className="header">Vurderinger</h1>
          <hr/>
          <div className="reviewsContainer">
            {filteredReviews?.map((review: ReviewDto) => (
            <ReviewComp
              key={review.id}
              owner_id={review.owner}
              rating={review.rating}
              review_description={review.details}
              owner_name={review.owner_username}
              review_id={review.id}
            />
            ))}
          </div>
        </div>
      </div>

    </PageWrapper>)
}
