import { useEffect, useState } from 'react'

function CompoundInterestCalculator() {
  const [formData, setFormData] = useState({
    "principal-sum": 1000,
    "interest-rate": 1,
    "number-of-years": 10
  });

  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  const onChange = (event) => {
    setFormData(previousFormData => {
      const currentFormData = {
        ...previousFormData,
        [event.target.name]: parseFloat(event.target.value)
      };

      return currentFormData;
    });
  };
   
    useEffect(() => {
      console.debug(formData);
      setEstimatedEarnings(formData["principal-sum"] * ((1 + formData["interest-rate"] / 100) ** formData["number-of-years"]));
    }, [formData, estimatedEarnings]);

  return (
    <>
      <form>
        <label>Principal: </label>
        <input 
          type="number" 
          min="1"
          value={formData["principal-sum"]}
          onChange={onChange}
          id="principal-sum"
          name="principal-sum"
        />

        <label>Interest rate: </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.5" 
          value={formData["interest-rate"]} 
          onChange={onChange}
          id="interest-rate"
          name="interest-rate"
        />

        <label>Number of years: </label>
        <input
          type="number"
          min="1"
          max="100"
          step="1"
          value={formData["number-of-years"]}
          onChange={onChange}
          id="number-of-years"
          name="number-of-years"
        />
      </form>

      <div>
        <span>Expected earnings:</span>
        <span id="estimated-earnings">{isNaN(estimatedEarnings) ? "N/A" : estimatedEarnings.toFixed(3)}</span>
      </div>
    </>
  )
}

export default CompoundInterestCalculator
