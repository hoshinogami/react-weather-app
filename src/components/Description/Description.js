
const Description=({data})=>{
     
  return (
     <label className="description">
    {data.trans_result[0].dst}
  </label>)
}

export default Description