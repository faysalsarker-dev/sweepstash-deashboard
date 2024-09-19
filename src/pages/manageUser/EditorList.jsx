import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, CircularProgress, Pagination, Box, Chip, Button, IconButton,
  Select, MenuItem, FormControl, InputLabel, InputBase
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import useAxios from './../../hook/useAxios';

const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '2px 8px',
  width: '100%',
  maxWidth: '400px',
});

const SearchButton = styled(IconButton)({
  padding: 10,
});

const CustomInput = styled(InputBase)({
  flex: 1,
  padding: '4px 8px',
});

const SortBox = styled(FormControl)({
  minWidth: 150,
  marginLeft: 16,
});

export default function EditorList() {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState('All');
  const [sort, setSort] = useState("latest");

  const limit = 5;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['editors', page, search, sort, sortStatus],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/editors?page=${page}&search=${search}&limit=${limit}&sort=${sort}&status=${sortStatus}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  // Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
    refetch();
  };

  const showConfirmation = (action, user) => {
    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: `You are about to ${action} the user ${user.name}. This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'delete' ? '#d33' : '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle mutation logic
        Swal.fire(`${action.charAt(0).toUpperCase() + action.slice(1)}d!`, `User has been ${action}ed.`, 'success');
      }
    });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    refetch();
  };

  const handleStatusSortChange = (event) => {
    setSortStatus(event.target.value);
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
      {/* Filters and Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
  <SearchBox variant="standard">
    <form onSubmit={handleSearchChange} style={{ display: 'flex', flexGrow: 1 }}>
      <CustomInput
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
      value={sortStatus}
      onChange={handleStatusSortChange}
      label="Sort By Status"
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="blocked">Blocked</MenuItem>
    </Select>
  </SortBox>
</Box>


      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="editors table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell align="left">Info</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Joining Time</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Avatar alt={row.name} src={row.profile || "/static/images/avatar/1.jpg"} />
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{row.name} as a <span className='font-bold'>{row.role}</span></span>
                      <span style={{ fontSize: '0.875rem', color: '#888' }}>{row.email}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.status}
                      color={row.status === 'active' ? 'success' : row.status === 'blocked' ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="left">{new Date(row.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    {row.status === 'active' ? (
                      <>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => showConfirmation('block', row)}
                        >
                          Block
                        </Button>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => showConfirmation('delete', row)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => showConfirmation('accept', row)}
                        >
                          Activate
                        </Button>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => showConfirmation('delete', row)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
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
