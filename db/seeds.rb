# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

member_one = Member.create("Jackson Avery", "jackson@seattlegrace.org")
member_two = Member.create("Pamela Halpert", "pam@dm.com")
member_three = Member.create("Leslie Knope", "lknope@pawneeparks.gov")
member_four = Member.create("Phoebe Bridgerton", "pbridge@eng.com")
member_five = Member.create("John Diggle", "jdig@argus.net")
member_six = Member.create("Barry Allen", "flash@theflash.org")
member_seven = Member.create("Hermione Granger", "hgrang@mom.wiz")
member_eight = Member.create("Olivia Pope", "pope@scandal.law")
member_nine = Member.create("Dory Fish", "psherman42@wallaby.way")
member_ten = Member.create("Nala Knowles", "boss@priderock.den")

check_in_one = CheckIn.create(score: 4, comment: "I felt pretty good today but didn't stick perfectly to my rest blocks.", member: 4)
check_in_two = CheckIn.create(score: 2, comment: "I haven't been getting sleep lately and it took a toll today.", member: 1)
check_in_three = CheckIn.create(score: 5, comment: "I had support group today and feel very encouraged.", member: 9)
check_in_four = CheckIn.create(score: 3, comment: "There isn't anything too stressful today but I also had a lot of trouble focusing on accomplishing the goals I wanted to.", member: 1)
check_in_five = CheckIn.create(score: 4, comment: "We went to an appointment today without any problems and received positive news. It's the small victories that are keeping me going.", member: 6)

