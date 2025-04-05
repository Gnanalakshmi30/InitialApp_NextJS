
  const getPredictedAge = async (name: string) => {
    const res = await fetch(`https://api.agify.io/?name=${name}`);
     const data = await res.json();
    return data?.age ?? "Unknown"; 
   
  }

  const getPredictedGender = async (name: string) => {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await res.json();
    return data?.gender ?? "Unknown";
  }

  const getPredictedCountry = async (name: string) => {
    const res = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await res.json();
    return data?.country?.[0]?.country_id ?? "Unknown"; 
}
  
interface Params{
  params: { name: string };
}

  export default async function Page({ params }: Params) {
     const name = params.name as string;
     const [age, gender, country] = await Promise.all([
    getPredictedAge(name),
    getPredictedGender(name),
    getPredictedCountry(name),
  ]);
    return (    
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Personal Info</div>
            <div  className="block mt-1 text-lg leading-tight font-medium text-black">Age: {age}</div>
            <div  className="block mt-1 text-lg leading-tight font-medium text-black">Gender: {gender}</div>
            <div className="block mt-1 text-lg leading-tight font-medium text-black">Country: {country}</div>
          </div>
      </div>
    );
  }