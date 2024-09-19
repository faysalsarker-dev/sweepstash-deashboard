import { Box, Grid, Typography, Skeleton } from "@mui/material";
import ShowCard from "../../component/ShowCard";
import LineCharts from "../../component/LineChart";
import PieChartComponent from "../../component/SecondChart";
import HyperText from './../../component/HyperText';
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";

const Home = () => {
    const axiosSecure = useAxios();
    
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['overview'],
        queryFn: async () => {
            const response = await axiosSecure.get('/dashboard/overview');
            return response.data;
        },
    });

    const loadingState = [1, 2, 3, 4]; // Used for skeleton placeholders

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fafafa' }}>
            {/* Overview Section */}
            <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.main' }}
            >
                <HyperText text="OVERVIEW" />
            </Typography>

            <Grid container spacing={3} sx={{ marginBottom: 3 }}>
                {isLoading ? (
                    loadingState.map((item) => (
                        <Grid item xs={12} md={3} key={item}>
                            <Skeleton variant="rectangular" height={140} />
                        </Grid>
                    ))
                ) : isError ? (
                    <Typography color="error">Failed to load data</Typography>
                ) : (
                    <>
                        <Grid item xs={12} md={3}>
                            <ShowCard title="Total Sweep" contentCount={data?.sweeps || 120} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ShowCard title="Total Blogs" contentCount={data?.blogs || 340} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ShowCard title="Total Users" contentCount={data?.users || 210} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ShowCard title="Total Editors" contentCount={data?.editors+20 || 0} />
                        </Grid>
                    </>
                )}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            For Sweep
                        </Typography>
                        {isLoading ? <Skeleton variant="rectangular" height={200} /> : <LineCharts />}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            For Blogs
                        </Typography>
                        {isLoading ? <Skeleton variant="rectangular" height={200} /> : <PieChartComponent />}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
