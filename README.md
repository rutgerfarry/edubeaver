# edubeaver (now [classmere](https://github.com/classmere))
**This edubeaver repo has moved to the  [classmere organization](https://github.com/classmere)**

An in-progress course finder for OSU Students written in Node / Angular.

## API Reference (In beta)
### Courses
#### List all courses
**GET** `http://api.edubeaver.com/v1/courses`
Returns a list of all course names and abbreviations in the edubeaver database.
##### Example Response
```json
[
	{
		"course": "BIOCULTURAL PERSPECTIVES ON HUMAN REPRODUCTION",
		"abbr": "ANTH 449"
	},
	{...}
]
```

#### Retrieve a course
**GET** `http://api.edubeaver.com/v1/courses/course_abbr`
Returns all information about a particular course, including information about each of its individual sections.
Note: "credits" is sometimes a range, e.g. "1-16", therefore it is returned as a string.
##### Example Response
```json
{
  "title": "Applied Physiology of Reproduction",
  "abbr": "ANS 327",
  "credits": "5",
  "description": "Principles, techniques and recent development in semen collection, 
  evaluation, extension and preservation; artificial insemination, estrus detection 
  and synchronization; pregnancy diagnosis and embryo transfer.",
  "sections": [
    {
      "term": "Fall 2015",
      "start_date": "2015-09-24",
      "end_date": "2015-12-04",
      "session": null,
      "crn": 10037,
      "section_number": 1,
      "credits": "5",
      "instructor": "Menino Jr, A.",
      "days": "TR",
      "start_time": "08:30:00",
      "end_time": "09:50:00",
      "location": "WITH 217",
      "campus": "Corv",
      "type": "Lecture",
      "status": "Open",
      "cap": 30,
      "enrolled": 0,
      "waitlist_cap": 0,
      "waitlist_current": 0,
      "fees": "$20.00",
      "restrictions": "Prereqs: (ANS 316 [D-] and ANS 317 [D-] )",
      "comments": null
    },
    {...}
  ]
}
```

### Search
Search only works for courses currently. More functionality will be added in the future.
#### Search for courses
**GET** `http://api.edubeaver.com/v1/search/courses`
Returns a list of up to 100 matching courses, not including invividual sections.
##### Parameters
| Name   | Type     | Description           |
| ------ | -------- | --------------------- |
| `q`    | `string` | The search terms      |
##### Example Response
```json
[
	{
		"title": "Applied Physiology of Reproduction",
		"abbr": "ANS 327",
		"credits": "5",
		"description": "Principles, techniques and recent development in semen collection, 
		evaluation, extension and preservation; artificial insemination, estrus detection 
		and synchronization; pregnancy diagnosis and embryo transfer."
	},
	{...}
]
```
