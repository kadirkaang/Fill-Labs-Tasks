package wordutils

import (
	"testing"
)

func TestSortByA(t *testing.T) {
	testCases := []struct {
		name     string
		input    []string
		expected []string
	}{
		{
			name:     "Test Case 2",
			input:    []string{"cat", "dog", "elephant", "tiger", "lion"},
			expected: []string{"elephant", "cat", "tiger", "lion", "dog"},
		},
		{
			name:     "Test Case 3",
			input:    []string{"apple", "grape", "kiwi", "banana", "orange"},
			expected: []string{"banana", "orange", "apple", "grape", "kiwi"},
		},
		{
			name:     "Test Case 4",
			input:    []string{"aaa", "bb", "cccc", "a", "bbb", "aa"},
			expected: []string{"aaa", "aa", "a", "cccc", "bbb", "bb"},
		},
		{
			name:     "Test Case 5",
			input:    []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l", "ab"},
			expected: []string{"aaaasd", "aaabcd", "aab", "ab", "a", "lklklklklklklklkl", "cssssssd", "fdz", "ef", "kf", "zc", "l"},
		},
		// You can add other test scenarios here
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := sortByA(tc.input)
			if len(got) != len(tc.expected) {
				t.Errorf("Error: expected %v, but got %v", tc.expected, got)
			}
			for i := range got {
				if got[i] != tc.expected[i] {
					t.Errorf("Error: expected %v, but got %v", tc.expected, got)
					break
				}
			}
		})
	}
}
