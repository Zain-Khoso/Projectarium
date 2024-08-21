// Lib Import.
import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

// Hook.
export default function useCountries() {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => formattedCountries.find((item) => item.value === value);

  return { getAll, getByValue };
}
