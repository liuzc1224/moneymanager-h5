import { createSelector } from 'reselect';

function filterData(hotGoodsList) {
	var result = {
		hotGoodsList: []
	};

	if (hotGoodsList && hotGoodsList.length > 0) {
		hotGoodsList.forEach( (item, index) => {
			if ((item.award.kindId === 2 || item.award.kindId === 3) && result.hotGoodsList.length < 2) {
				result.hotGoodsList.push(item);
			}
		})
	}

  return result;
}

const hotGoodsListSelector = (hotGoodsList) => hotGoodsList;

const hotGoodsSelector = createSelector(
	[hotGoodsListSelector],
	(hotGoodsList) => {
		return filterData(hotGoodsList);
	}
)

export default hotGoodsSelector;