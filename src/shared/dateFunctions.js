export function formateReleaseDate(date){
	if (!date) return "-"
	const parsedDate = new Date(date)
	return parsedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
}