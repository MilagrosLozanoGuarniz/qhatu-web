import React from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ProductContainer from '../../components/products/ProductContainer';
import CardLoader from '../../components/loader/CardLoader';

const PurchasesStl = ({ products, refCategory, refOrder, handleChangeCategory, handleChangeOrder }) => {

  return (
    <>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8} sx={{ textAlign: 'right' }}>
        <InputLabel id="demo-simple-select-label">Filtrar por</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue='0'
            label="Filtrar por"
            onChange={handleChangeCategory}
            displayEmpty
            inputRef={refCategory}
          >
            <MenuItem value='0'><em>Todos</em></MenuItem>
            {products.categories && products.categories.map((category) => {
              return <MenuItem value={category.categoryId} key={category.categoryId}>{category.description}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid item xs={8} sx={{ textAlign: 'right' }}>
        <InputLabel id="demo-simple-select-label2">Ordenar por</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select"
            defaultValue='0'
            label="Ordenar por"
            onChange={handleChangeOrder}
            displayEmpty
            inputRef={refOrder}
          >
            <MenuItem value='0'><em>Precio de menor a mayor</em></MenuItem>
            <MenuItem value='1'><em>Precio de mayor a menor</em></MenuItem>
            <MenuItem value='2'><em>Más vendidos</em></MenuItem>
          </Select>
        </Grid>
      </Grid>
      <br />
      {products.loading ? (
        <CardLoader />
      ) : (
        <ProductContainer products={products} />
      )}
    </>
  );
};

export default PurchasesStl;
