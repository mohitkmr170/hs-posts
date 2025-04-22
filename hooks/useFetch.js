import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useFetch(url) {
  const { data, error } = useSWR(url, fetcher);
  return { data, error };
}
