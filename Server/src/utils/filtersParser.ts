interface Params {
  limit?: number;
  skip?: number;
  filter: string;
  sort: string;
}

export default function filtersParser(params: Params) {
  let filter = params && params.filter ? JSON.parse(params.filter) : {};
  let parsedFilters: any = {};

  for (const key in filter) {
    if (['sort', 'select', 'populate', 'limit', 'skip'].indexOf(key) !== -1) continue;

    let FILTER_VALUE = filter[key];

    //= Compared filter
    if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.startsWith(">=")) parsedFilters[key] = { $gte: parseInt(FILTER_VALUE.substring(2)) };
    else if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.startsWith("<=")) parsedFilters[key] = { $lte: parseInt(FILTER_VALUE.substring(2)) };
    else if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.startsWith(">")) parsedFilters[key] = { $gt: parseInt(FILTER_VALUE.substring(1)) };
    else if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.startsWith("<")) parsedFilters[key] = { $lt: parseInt(FILTER_VALUE.substring(1)) };

    //= Ranged filter
    else if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.includes('~')) {
      let splitedValue = FILTER_VALUE.split('~');
      let rangeFrom = splitedValue[0];
      let rangeTo = splitedValue[1];

      parsedFilters[key] = { $gte: parseInt(rangeFrom), $lte: parseInt(rangeTo) }
    }

    //= Within array filter
    else if (typeof FILTER_VALUE === 'object' && 'length' in FILTER_VALUE) {
      parsedFilters[key] = { $in: FILTER_VALUE }
    }

    //= Search Filter
    else if (typeof FILTER_VALUE === 'string' && FILTER_VALUE.startsWith('$=')) parsedFilters[key] = { $regex: FILTER_VALUE.trim().substring(2), $options: 'i' };

    //= Normal value filter
    else parsedFilters[key] = FILTER_VALUE;
  }

  let sort: { [key: string]: number; } = params && params.sort ? JSON.parse(params.sort) : {};
  let skip: number = params && params.skip ? params.skip : 0;
  let limit: number = params && params.limit ? params.limit : 0;
  let options = {
    sort,
    skip,
    limit
  };

  return {
    filters: parsedFilters, options
  };
}

/* filtersParser Guide
{
  filter: {
    valued: "hassan",
    ranged: `20201125~20220322`,                                    [~]
    compared: `>=254653132`,                                        [>, >=, <, <=]
    multiValued: [valueOne, valueTwo, valueThree],                    
    searched: "$=this is a value to be used as a search query"       [$Text]
  },
  select: {
    fieldOne: 1,                                    [Included]
    fieldTwo: 1,                                    [Included]
    ------- OR --------
    fieldThree: 0,                                  [Excluded]
  },
  sort: {
    fieldOne: 1,                                    [ASC]
    fieldTwo: -1                                    [DESC]
  },
  limit: 10,
  skip: 5
}
*/