type Province = {
  code: string;
  name: string;
  region: string;
};

type ProvinceResponse = {
  data: Province[];
};

export type City = {
  code: string;
  name: string;
  type: string;
  district: string;
  zip_code: number;
  region: string;
  province: string;
};

type CityResponse = {
  data: City[];
};

export const fetchProvinces = async (region4first?: boolean) => {
  const res = await fetch("https://psgc.cloud/api/v2/provinces");
  const data: ProvinceResponse = await res.json();

  let provinces = data.data;

  if (region4first) {
    provinces = provinces.sort((a, b) => {
      const isRegionA = a.region === "Region IV-A (CALABARZON)";
      const isRegionB = b.region === "Region IV-A (CALABARZON)";
      return Number(isRegionB) - Number(isRegionA);
    });
  }

  return provinces;
};
