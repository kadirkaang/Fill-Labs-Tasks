package arrayutils

func mostRepeated(arr []string) string {
	counts := make(map[string]int)

	for _, item := range arr {
		counts[item]++
	}
	maxCount := 0
	maxItem := ""

	for item, count := range counts {
		if count > maxCount {
			maxCount = count
			maxItem = item
		}
	}
	return maxItem
}
