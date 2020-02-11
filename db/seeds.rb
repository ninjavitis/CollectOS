# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


collectibleData = [
  ['Standard Moose', 'Moose', 'A standard moose', '', 0],
  ['Bog Standard Moose', 'Moose',  'A moose native to boggy areas', 1],
  ['Mega Moose', 'Moose', 'Five times larger than a standard moose', 3],
  ['Mangy Moose', 'Moose', 'This moose has quite a bit of mange', 3]
  ['Christmas Moose', 'Moose', 'A festive moose for the holidays', 4],
  ['Limited Edition Moose', 'Moose', 'A limited edition moose', 5],
]

collectibleData.each do |name,type,desc,image,tier|
  Ctype.create(
    name:name, 
    desc:desc, 
    image:image,
    tier:tier,
  )
end