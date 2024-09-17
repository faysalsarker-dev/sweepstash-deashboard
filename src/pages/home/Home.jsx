
import { Box, Grid, Typography } from "@mui/material";
import ShowCard from "../../component/ShowCard";
import LineCharts from "../../component/LineChart";
import PieChartComponent from "../../component/SecondChart";
import HyperText from './../../component/HyperText';

const Home = () => {
    const totalContent = 123;

    return (
        <Box sx={{ padding: 2 }}>
            {/* Overview Section */}
            <Typography
                variant="h5"
                component="div"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 4,
                    color: 'primary.main',
                }}
            >
                <HyperText text={'OVERVIEW'} />
            </Typography>

            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} md={3}>
                    <ShowCard title={'Total Sweep'} contentCount={totalContent} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ShowCard title={'Total Blogs'} contentCount={totalContent} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ShowCard title={'Total Users'} contentCount={totalContent} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ShowCard title={'Total Editors'} contentCount={totalContent} />
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            For Sweep
                        </Typography>
                        <LineCharts />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            For Blogs
                        </Typography>
                        <PieChartComponent />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
