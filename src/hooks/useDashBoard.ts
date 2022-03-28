import {Visit} from "core/schema";

interface HashTable {
  [index: string]: { [index: string]: Visit[] }
}

export default function useDashBoard(data: Visit[] | null) {
  if (!data) {
    return []
  }

  const hashTable: HashTable = {};


  data.forEach((e) => {
    if (!hashTable[e.city]) {
      hashTable[e.city] = {}
    }
    if (!hashTable[e.city][e.regionName]) {
      hashTable[e.city][e.regionName] = []
    }
    hashTable[e.city][e.regionName] = [...hashTable[e.city][e.regionName], e]

  });

  return [hashTable]
}