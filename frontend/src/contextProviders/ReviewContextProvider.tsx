import { useContext, createContext, SetStateAction, Dispatch, ReactNode, useEffect, useState } from 'react';
import { ReportedReviewDto, ReviewDto } from '~/dto';
import { getReviews, getReportedReviews } from '~/api';
import { CustomToast } from '~/components/CustomToast';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';

export type SetState<T> = Dispatch<SetStateAction<T>>;

type ReviewsContextProps = {
  reviews: ReviewDto[] | undefined;
  setReviews: SetState<ReviewDto[] | undefined>;
  //setNewReview: SetState<ReviewDto | undefined>;

  reportedReviews: ReportedReviewDto[] | undefined;
  setReportedReviews: SetState<ReportedReviewDto[] | undefined>;

  addReview: (newReview: ReviewDto) => void;
};

const ReviewsContext = createContext<ReviewsContextProps | undefined>(undefined);

export function useReviewsContext(): ReviewsContextProps {
  const reviewsContext = useContext(ReviewsContext);
  if (reviewsContext === undefined) {
    throw new Error('useReviewsContext must be used within an ReviewsContextProviderContextProvider');
  }
  return reviewsContext;
}

type ReviewsContextProviderProps = {
  enabled?: boolean;
  children: ReactNode;
};

export function ReviewsContextProvider({ children, enabled = true }: ReviewsContextProviderProps) {
  const { user } = useAuthContext();
  const [reviews, setReviews] = useState<ReviewDto[]>();
  const [reportedReviews, setReportedReviews] = useState<ReportedReviewDto[]>();

  /*
  const [loading, setLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  */

  const [showToastTitle, setShowToastTitle] = useState<string>('Feil');
  const [toastVariant, setToastVariant] = useState<string>('secondary');
  const [showToastState, setShowToastState] = useState<boolean>(false);
  const [showToastMessage, setShowToastMessage] = useState<string>('Noe gill galt!');

  const GET_Reviews = 'Rapporterte aktiviteter';

  const GET_REPORTED_Reviews = 'Rapporterte aktiviteter';

  const Reviews_SUCCESS_MSG = 'Hentet rapportert aktivitet';
  const Reviews_ERROR_MSG = 'Kunne IKKE hente rapportert!';

  const REPORTED_Reviews_SUCCESS_MSG = 'Hentet rapporterte aktiviteter';
  const REPORTED_Reviews_ERROR_MSG = 'Kunne IKKE hente rapporterte aktiviteter!';

  //const INFO_VARIANT = "info";
  const ERROR_VARIANT = 'danger';
  const SUCCESS_VARIANT = 'success';

  useEffect(() => {
    if (!enabled) return;
    getReviews()
      .then((reviews) => {
        setShowToastTitle(GET_Reviews);
        setToastVariant(SUCCESS_VARIANT);
        setShowToastMessage(Reviews_SUCCESS_MSG);
        setShowToastState(true);
        setReviews(reviews);
      })
      .catch((error) => {
        setShowToastTitle(GET_Reviews);
        setToastVariant(ERROR_VARIANT);
        setShowToastMessage(Reviews_ERROR_MSG);
        setShowToastState(true);
        console.log(error);
      });
    if (user) {
      getReportedReviews()
        .then((reportedReviews) => {
          setShowToastTitle(GET_REPORTED_Reviews);
          setToastVariant(SUCCESS_VARIANT);
          setShowToastMessage(REPORTED_Reviews_SUCCESS_MSG);
          setShowToastState(true);
          setReportedReviews(reportedReviews);
        })
        .catch((error) => {
          setShowToastTitle(GET_REPORTED_Reviews);
          setToastVariant(ERROR_VARIANT);
          setShowToastMessage(REPORTED_Reviews_ERROR_MSG);
          setShowToastState(true);
          console.log(error);
        });
    }
  }, [enabled]);

  const addReview = (newReview: ReviewDto) => {
    setReviews((preReviews) => {
      if (preReviews) {
        return [...preReviews, newReview];
      } else return [newReview];
    });
  };

  const contextValue: ReviewsContextProps = {
    reviews: reviews,
    setReviews: setReviews,

    reportedReviews: reportedReviews,
    setReportedReviews: setReportedReviews,

    addReview: addReview,
  };
  return (
    <>
      <CustomToast
        position={'top-end'}
        toastTitle={showToastTitle}
        variant={toastVariant}
        toastState={showToastState}
        toastMessage={showToastMessage}
        setToastState={setShowToastState}
      />
      <ReviewsContext.Provider value={contextValue}>{children}</ReviewsContext.Provider>
    </>
  );
}
