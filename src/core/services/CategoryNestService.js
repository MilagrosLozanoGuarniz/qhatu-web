import instance from '../../axios/instanceNest';

const getAll = async () => {
  try {
    const categoriesReponse = await instance.get(
      process.env.REACT_APP_QHATU_API_NEST_PATH_CATEGORIES_GETALL
    );
    return {
      success: categoriesReponse.status === 200,
      data: categoriesReponse.data,
    };
  } catch (error) {}
};


const CategoryNestService = {
  getAll: getAll,
};

export default CategoryNestService;
