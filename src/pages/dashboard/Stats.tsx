import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useApi } from "../../utils/hooks";
import StatsContainer from "../../components/StatsContainer";
import LoadingLocal from "../../components/LoadingLocal";
import ChartsContainer from "../../components/ChartsContainer";

type Props = {};

export type StatsType = {
  stats: Record<string, number>;
  monthlyApplications: { count: number; date: [number, number] }[];
};

const Stats: React.FC<Props> = () => {
  const { displayAlert, axiosWithToken } = useAppContext();

  const [apiData, apiError, apiLoading, apiCall] = useApi<StatsType>(async () =>
    axiosWithToken.get(`/api/job/stats`)
  );

  // get jobs
  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiData) console.log(apiData);
    if (apiError) displayAlert("Jobs cannot be fetched.");
  }, [apiData, apiError, displayAlert]);

  const renderContent = (data: StatsType | undefined) => {
    if (!data) return null;

    const { stats, monthlyApplications } = data;
    return (
      <>
        <StatsContainer stats={stats} />
        {monthlyApplications.length && (
          <ChartsContainer applications={monthlyApplications} />
        )}
      </>
    );
  };

  return (
    // <section style={{ position: "relative" }}> // not the case in that page
    <>
      {apiLoading && <LoadingLocal clear />}
      {renderContent(apiData)}
    </>
  );
};

export default Stats;
