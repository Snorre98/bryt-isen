import { useContext, createContext, SetStateAction, Dispatch, ReactNode, useEffect, useState } from 'react';
import {ActivityDto, ReportedActivityDto} from "~/dto";
import {getActivities, getReportedActivities} from "~/api";
import {CustomToast} from "~/components/CustomToast";
import {useAuthContext} from "~/contextProviders/AuthContextProvider";


export type SetState<T> = Dispatch<SetStateAction<T>>;

type ActivitiesContextProps = {
  activities: ActivityDto[] | undefined;
  setActivities: SetState<ActivityDto[] | undefined>;

  reportedActivities: ReportedActivityDto[] | undefined;
  setReportedActivities: SetState<ReportedActivityDto[] | undefined>;

};

const ActivitiesContext = createContext<ActivitiesContextProps| undefined>(undefined)

export  function useActivitiesContext(): ActivitiesContextProps{
  const activitiesContext = useContext(ActivitiesContext);
  if(activitiesContext === undefined){
  throw new Error('useActivitiesContext must be used within an ActivitiesContextProviderContextProvider');
}
  return activitiesContext
}

type ActivitiesContextProviderProps = {
  enabled?: boolean;
  children: ReactNode;
}

export function ActivitiesContextProvider({children, enabled = true}: ActivitiesContextProviderProps){
  const {user} = useAuthContext();
  const [activities, setActivities] = useState<ActivityDto[]>();
  const [reportedActivities, setReportedActivities] = useState<ReportedActivityDto[]>()

  /*
  const [loading, setLoading] = useState(true);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');
  */

  const [showToastTitle, setShowToastTitle] = useState<string>("Feil")
  const [toastVariant, setToastVariant] = useState<string>("secondary")
  const [showToastState, setShowToastState] = useState<boolean>(false)
  const [showToastMessage, setShowToastMessage] = useState<string>("Noe gill galt!")

  const GET_ACTIVITIES = "Aktiviteter";

  const GET_REPORTED_ACTIVITIES = "Rapporterte aktiviteter"

  const ACTIVITIES_SUCCESS_MSG = "Hentet aktiviteter"
  const ACTIVITIES_ERROR_MSG = "Kunne IKKE hente aktiviteter!"

  const REPORTED_ACTIVITIES_SUCCESS_MSG = "Hentet rapporterte aktiviteter"
  const REPORTED_ACTIVITIES_ERROR_MSG = "Kunne IKKE hente rapporterte aktiviteter!"

  //const INFO_VARIANT = "info";
  const ERROR_VARIANT = "danger";
  const SUCCESS_VARIANT = "success";



  useEffect(() => {
    if(!enabled) return;
    getActivities().then((activities)=> {
      setShowToastTitle(GET_ACTIVITIES)
      setToastVariant(SUCCESS_VARIANT)
      setShowToastMessage(ACTIVITIES_SUCCESS_MSG)
      setShowToastState(true)
      setActivities(activities)
    }).catch((error)=>{
      setShowToastTitle(GET_ACTIVITIES)
      setToastVariant(ERROR_VARIANT)
      setShowToastMessage(ACTIVITIES_ERROR_MSG)
      setShowToastState(true)
      console.log(error)
    });
    if(user){
      getReportedActivities().then((reportedActivities) => {
        setShowToastTitle(GET_REPORTED_ACTIVITIES)
        setToastVariant(SUCCESS_VARIANT)
        setShowToastMessage(REPORTED_ACTIVITIES_SUCCESS_MSG)
        setShowToastState(true)
        setReportedActivities(reportedActivities)
      }).catch((error)=>{
        setShowToastTitle(GET_REPORTED_ACTIVITIES)
        setToastVariant(ERROR_VARIANT)
        setShowToastMessage(REPORTED_ACTIVITIES_ERROR_MSG)
        setShowToastState(true)
        console.log(error)
      })
    }

  }, [enabled, user]);

  const contextValue: ActivitiesContextProps = {
    activities: activities,
    setActivities: setActivities,

    reportedActivities: reportedActivities,
    setReportedActivities: setReportedActivities,

  };
  return(
    <>
      <ActivitiesContext.Provider value={contextValue}>{children}</ActivitiesContext.Provider>
      <CustomToast
        position={"top-center"}
      toastTitle={showToastTitle}
      variant={toastVariant}
      toastState={showToastState}
      toastMessage={showToastMessage}
      setToastState={setShowToastState}/>
    </>
  )
}
