package mathutils

import "fmt"

func divideByTwo(num int) {

	if num > 3 {
		divideByTwo(num / 2)
	}
	fmt.Println(num)
}
