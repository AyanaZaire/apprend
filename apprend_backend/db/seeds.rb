# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.destroy_all
Location.destroy_all
Course.destroy_all


Category.create([
 {name: 'Arts'},
 {name: 'Textile'},
 {name: 'Music'},
 {name: 'Technology'},
 {name: 'Design'}
])

Location.create([
  {city: 'Washington, D.C'},
  {city: 'New York'},
  {city: 'Miami'}
])


Course.create([

  {title:'Beginning Painting', description: 'Students will learn the fundamentals of painting: materials and tools, paint handling, shape, value, basic color mixing, space and composition in this series of foundation classes. The sequence of courses runs the full academic year with a different emphasis each term, and provides a solid foundation for students interested in developing their perceptual and aesthetic skills. Fall term covers shape, value and planes in depth; winter emphasizes color; and spring is pictorial space and composition – although each are covered to different degrees in every term. It is recommended that students take all three terms for maximum benefit, however they can be taken independently as well. Subject matter includes still life, interior space and figure.', time: '18:00:00', date: '2018-09-06', category_id: 1, location_id: 1},
  {title:'Weaving to Code, Coding to Weave', description: 'Learn the history and basic practices of weaving as a way to understand the binary system and its importance in computer programming. Participants will take part in weaving and coding activities throughout three sessions that intertwine the relationship between craft and digital work.', time: '13:00:00', date: '2018-09-08', category_id: 4, location_id: 2},
  {title:'Clay Scupture: Figurative Humanism', description: 'Crucially important for all artists, sculpture sharpens the visual skills essential to seeing and developing the three-dimensional aspects of human form. Through the sense of touch, students will understand masses in relation to each other and surrounding space, as well as the definition and direction of planes, leading to an understanding of gesture, weight, balance, rhythm, and the essential spirit of the pose. The ultimate goal is to develop a vocabulary and ability to connect form and feeling. Work will be from the figure model.', time: '18:00:00', date: '2018-09-04', category_id: 1, location_id: 1},
  {title:'Learn To Sew', description: 'Learn basic sewing skills, sewing machine & tool basics, sew seams & construct a simple pillow! Intended for adults & teens 15 & older. This class includes free sewing supplies (while they last).', time: '18:00:00', date: '2018-09-04', category_id: 2, location_id: 3},
  {title:'HTML/CSS Crash Course!', description: 'All modern websites utilize HTML (the structures that support the web) and CSS (the language that makes the web look beautiful) as part of their site structure. We also introduce you to JavaScript, the programming language of the web. If you have any interest in editing, enhancing, or uploading information on the world wide web, this course will teach you how to do it.', time: '18:00:00', date: '2018-09-04', category_id: 4, location_id: 1},
  {title:'Introduction To Adobe Illustrator', description: 'Bring your creative ideas to life with Adobe Illustrator, the industry-standard vector graphics software, used by designers and illustrators who want to create digital graphics, logos, illustrations, and original typography. This workshop is designed to get you up and running with Adobe Illustrator in just one day. The focus will be on step-by-step instruction leading students through the most important tools and concepts in Illustrator.', time: '18:00:00', date: '2018-09-04', category_id: 5, location_id: 2},
  {title:'Essential Music Theory', description: 'Many people believe it is hard to learn to read music. It isnt! In fact, reading music is a little like learning to read another language, but much easier than most languages to learn!. In fact, if you are reading this - you can learn how to read music with just a little effort.', time: '18:00:00', date: '2018-09-04', category_id: 3, location_id: 1}

  ])
