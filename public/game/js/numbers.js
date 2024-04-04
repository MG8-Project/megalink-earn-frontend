


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function numberLength(number) {
	var str = number + "";
	return str.length;
  }

function revCurrencyFormatting(str)
{
  return (+(str+"").replaceAll(",", ""))*1
}

function currencyFormatting(value)
{
  //return new Intl.NumberFormat('ko-KR', { }).format(BigInt(Math.floor(value*1)).toString())

  return (value*1).toLocaleString()
}

function mkUnitNumber(num){

  let unitedNum = num;
  let unit = ["", "K", "M", "B", "T"];
  let unitKey = 0;

  while(Math.abs(unitedNum/1000) > 1 && unitKey < unit.length-1)
  {
    unitedNum = (unitedNum/1000).toFixed(1);
    unitKey++;
  }

 
  return currencyFormatting(unitedNum) + unit[unitKey]
}

function elevateNumber(object, dest, callback, duration, skipable)
{

  if(!duration)
  {
      duration = 800;
  }



  if(object.elavate)
  {
    clearTimeout(object.elavate);
    object.elavate = null;
  }


  // let duration = 800;
  let tick = 16;

  let src = revCurrencyFormatting(object.text);
  
  let value = src

  dest = Number(dest)

  let frames = duration/tick;

  let unit = ((dest) - src)/frames;

    //if(unit < 1) unit = 1;
    
  let elevate = function(){
    object.elavate = null;

    value += Math.min((dest) - value, unit)

    object.text = currencyFormatting(Math.floor(value))
    
    if(value < (dest))
    {
      object.elavate = setTimeout(()=>{

        elevate();

      }, tick)
    }
    else if(typeof callback == 'function')
    {
        callback(object);
    }

  }

  elevate();

}