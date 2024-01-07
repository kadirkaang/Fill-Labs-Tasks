package wordutils

import (
	s "strings"
)

func sortByA(arr []string) []string {
	size := len(arr)

	for i := 0; i < size-1; i++ {
		for j := i + 1; j < size; j++ {
			if s.Count(arr[i], "a") < s.Count(arr[j], "a") {
				temp := arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			} else if s.Count(arr[i], "a") == 0 && s.Count(arr[j], "a") == 0 && len(arr[i]) < len(arr[j]) {
				temp := arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}
	}
	return arr
}
