package wordutils

import (
	"sort"
	s "strings"
)

func swap(arr []string, i int, j int) {
	temp := arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

func sortByA(arr []string) []string {

	// for i := 0; i < size-1; i++ {
	// 	for j := i + 1; j < size; j++ {
	// 		if countA(arr[i]) < countA(arr[j]) {
	// 			swap(arr, i, j)
	// 		} else if countA(arr[i]) == countA(arr[j]) && !(len(arr[i]) > len(arr[j])) {
	// 			if len(arr[i]) < len(arr[j]) {
	// 				swap(arr, i, j)
	// 			} else if s.Compare(arr[i], arr[j]) == -1 {
	// 				swap(arr, i, j)
	// 			}
	// 		} else if countA(arr[i]) == 0 && countA(arr[j]) == 0 && !(len(arr[i]) > len(arr[j])) {
	// 			if len(arr[i]) < len(arr[j]) {
	// 				swap(arr, i, j)
	// 			} else if s.Compare(arr[i], arr[j]) < 0 {
	// 				fmt.Println(arr[i], arr[j])
	// 				swap(arr, i, j)
	// 			}
	// 		}

	// 	}
	// }
	sort.Slice(arr, func(i, j int) bool {
		countA_i := s.Count(arr[i], "a")
		countA_j := s.Count(arr[j], "a")

		// 'a' harfinin sayısına göre karşılaştır
		if countA_i != countA_j {
			return countA_i > countA_j
		}

		// Eğer sayılar eşitse, uzunluklarına göre karşılaştır
		if len(arr[i]) != len(arr[j]) {
			return len(arr[i]) > len(arr[j])
		}

		// Uzunluklar eşitse, leksikografik olarak karşılaştır
		return arr[i] < arr[j]
	})

	return arr
}

// func countA(word string) int {
// 	return strings.Count(word, "a")
// }

// func sortByA(words []string) []string {
// 	sort.Slice(words, func(i, j int) bool {
// 		if countA(words[i]) == countA(words[j]) {
// 			return len(words[i]) > len(words[j])
// 		}
// 		return countA(words[i]) > countA(words[j])
// 	})
// 	return words
// }
