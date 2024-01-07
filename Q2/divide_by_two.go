package mathutils

import "fmt"

func divide_by_two(num int) {

	if num > 3 {
		divide_by_two(num / 2)
	}
	fmt.Println(num)
}
