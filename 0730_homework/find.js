let ary = [
    {
      id: 1,
      type: 'A',
      price: 100,
    },
    {
      id: 2,
      type: 'B',
      price: 200,
    },
    {
      id: 3,
      type: 'A',
      price: 150,
    },
  ];
  
  //找到id = 2

  //array.find

  let result0 = ary.find( (item) => item.id ===2 )
  console.log(result0)

  //for loop

  function aryFind(ary){
    let result = null
    for ( i = 0; i < ary.length; i++){
        
        if (ary[i].id === 2){
            result = ary[i]
            break
        }
    }
    return result;
  }

  console.log(aryFind(ary))