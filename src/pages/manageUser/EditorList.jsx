import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, CircularProgress, Pagination, Box, Chip, Button, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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















export default function EditorList() {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [valsearch, setvalSearch] = useState("");
  
  const [sort, setSort] = useState("latest"); // State for sorting
  const limit = 5;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['editors', page, search, sort],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/editors?page=${page}&search=${search}&limit=${limit}&sort=${sort}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    refetch();
  };

  const handleSearchChange = () => {
    setSearch(valsearch);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    refetch();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  const { data: rows, totalPages } = data || {};

  return (
    <>
      {/* Search and Sort Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <SearchBox>
        <form onSubmit={handleSearchChange} style={{ display: 'flex', flexGrow: 1 }}>
          <CustomInput
            placeholder="Search Editors"
            value={valsearch}
            onChange={(e)=>setvalSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search editors' }}
          />
          <SearchButton type="submit" aria-label="search">
            <SearchIcon />
          </SearchButton>
        </form>
      </SearchBox>

      <SortBox variant="standard">
        <InputLabel id="sort-label">
          <SortIcon sx={{ mr: 1 }} />
          Sort By
        </InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="latest">Latest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </SortBox>
    </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="editors table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell align="left">Info</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Joining Time</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Avatar alt={row.name} src={row.profile || "/static/images/avatar/1.jpg"} />
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{row.name}</span>
                      <span style={{ fontSize: '0.875rem', color: '#888' }}>{row.email}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Chip label={row.role} color={row.role === 'editor' ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="left">{new Date(row.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="left">
                    <Button variant="contained">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
