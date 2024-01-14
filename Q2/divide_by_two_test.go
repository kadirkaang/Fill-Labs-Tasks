// mathutils_test.go

package mathutils

import (
	"fmt"
	"io"
	"os"
	"testing"
)

func TestDivideByTwo(t *testing.T) {
	tests := []struct {
		input    int
		expected string
	}{
		{input: 8, expected: "2\n4\n8\n"},
		{input: 9, expected: "2\n4\n9\n"},
		// You can add other test scenarios here
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("Input: %d", test.input), func(t *testing.T) {
			// Create a buffer to capture fmt.Println output
			originalOutput := os.Stdout

			// Temporarily replace os.Stdout with a pipe
			r, w, _ := os.Pipe()
			os.Stdout = w

			// Defer to revert os.Stdout back to its original value
			defer func() {
				os.Stdout = originalOutput
				w.Close()
			}()

			// Call the test function
			divideByTwo(test.input)

			// Capture the output
			w.Close()
			got, _ := io.ReadAll(r)

			// Check the expected output
			if string(got) != test.expected {
				t.Errorf("Error: expected: %s, but got: %s", test.expected, string(got))
			}
		})
	}
}
