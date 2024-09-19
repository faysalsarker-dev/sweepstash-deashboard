import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Chip,
  Button,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useQuery } from '@tanstack/react-query';
import useAxios from './../../hook/useAxios';
import { styled } from '@mui/material/styles';

const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: '0 10px',
  boxShadow: theme.shadows[1],
  flexGrow: 1,
}));

const CustomInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: '8px',
  fontSize: '0.875rem',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '& input::placeholder': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  padding: '10px',
  color: theme.palette.primary.main,
}));

const SortBox = styled(FormControl)(({ theme }) => ({
  minWidth: 160,
  marginLeft: theme.spacing(2),
  marginTop: '4px',
}));

export default function AllSweep() {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [valsearch, setvalSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [sortByStatus, setSortByStatus] = useState("All");
  const limit = 5;

  // Mock data for demonstration
  const mockPosts = [
    {
      _id: '1',
      title: 'How to Learn JavaScript',
      author: 'John Doe',
      status: 'published',
      publishedAt: '2023-09-10T10:00:00Z',
    },
    {
      _id: '2',
      title: 'Understanding React Hooks',
      author: 'Jane Smith',
      status: 'draft',
      publishedAt: '2023-09-12T14:00:00Z',
    },
    {
      _id: '3',
      title: 'Mastering Node.js',
      author: 'David Johnson',
      status: 'published',
      publishedAt: '2023-08-25T09:30:00Z',
    },
    {
      _id: '4',
      title: 'CSS Grid vs Flexbox',
      author: 'Alice Brown',
      status: 'draft',
      publishedAt: '2023-09-05T18:15:00Z',
    },
    {
      _id: '5',
      title: 'Advanced TypeScript Patterns',
      author: 'Michael Lee',
      status: 'published',
      publishedAt: '2023-09-08T13:45:00Z',
    },
  ];

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts', page, search, sort, sortByStatus],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/posts?page=${page}&search=${search}&limit=${limit}&sort=${sort}&status=${sortByStatus}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    refetch();
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(valsearch);
    refetch();
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    refetch();
  };

  const handleStatusSortChange = (event) => {
    setSortByStatus(event.target.value);
    refetch();
  };

  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (isError) {
  //   return <div>Error fetching data.</div>;
  // }

  const { data: rows, totalPages } = data || { data: mockPosts, totalPages: 4 }; // Mock fallback

  return (
    <>
      {/* Search and Sort Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <SearchBox variant="standard">
          <form onSubmit={handleSearchChange} style={{ display: 'flex', flexGrow: 1 }}>
            <CustomInput
              placeholder="Search Posts"
              value={valsearch}
              onChange={(e) => setvalSearch(e.target.value)}
              inputProps={{ 'aria-label': 'search posts' }}
            />
            <SearchButton type="submit" aria-label="search">
              <SearchIcon />
            </SearchButton>
          </form>
        </SearchBox>

        <SortBox variant="standard">
          <InputLabel id="sort-label">
            <SortIcon sx={{ mr: 1 }} />
            Sort By Date
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sort}
            onChange={handleSortChange}
            label="Sort By Date"
          >
            <MenuItem value="latest">Latest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </SortBox>

        <SortBox variant="standard">
          <InputLabel id="sort-status-label">
            <SortIcon sx={{ mr: 1 }} />
            Sort By Status
          </InputLabel>
          <Select
            labelId="sort-status-label"
            id="sort-status-select"
            value={sortByStatus}
            onChange={handleStatusSortChange}
            label="Sort By Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </SortBox>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="posts table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Images</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Published</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">
                    <img src="" className="w-full rounded-lg" alt="" />
                  </TableCell>
                  <TableCell align="left">{row.author}</TableCell>
                  <TableCell align="left">
                    <Chip label={row.status} color={row.status === 'published' ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="left">{new Date(row.publishedAt).toLocaleString()}</TableCell>
                  <TableCell align="left">
                    <Button variant="contained">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </>
  );
}
