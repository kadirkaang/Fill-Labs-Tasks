package wordutils

import (
	"sort"
	s "strings"
)

func sortByA(arr []string) []string {
	sort.Slice(arr, func(i, j int) bool {
		countA_i := s.Count(arr[i], "a")
		countA_j := s.Count(arr[j], "a")

		// Compare based on the count of 'a' characters
		if countA_i != countA_j {
			return countA_i > countA_j
		}

		// If counts are equal, compare based on the lengths
		if len(arr[i]) != len(arr[j]) {
			return len(arr[i]) > len(arr[j])
		}

		// If lengths are equal, compare lexicographically
		return arr[i] < arr[j]
	})

	return arr
}
