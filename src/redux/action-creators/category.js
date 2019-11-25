import {
  reqGetCategories,
  reqAddCategory,
  reqUpdateCategory,
  reqDelCategory
} from '../../api';

// 同步
const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})
//异步请求
export const getCategoriesAsync = () => {
  return (dispatch) => {
    return reqGetCategories()
      .then((response) => {
        dispatch(getCategoriesSuccess(response));
      })
  }
}