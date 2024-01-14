package arrayutils

import (
	"testing"
)

func TestMostFrequent(t *testing.T) {
	testCases := []struct {
		name     string
		input    []string
		expected string
	}{
		{
			name:     "Test Case 1",
			input:    []string{"apple", "pie", "apple", "red", "red", "red"},
			expected: "red",
		},
		{
			name:     "Test Case 2",
			input:    []string{"apple", "pie", "apple", "red", "red", "red", "pie", "pie", "pie"},
			expected: "pie",
		},
		// You can add other test scenarios here

	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := mostRepeated(tc.input)
			if got != tc.expected {
				t.Errorf("Error: expected %v, but got %v", tc.expected, got)
			}
		})
	}
}
