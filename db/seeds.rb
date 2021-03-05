# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

member_one = Member.create(name: "Jackson Avery", email: "jackson@seattlegrace.org")
member_two = Member.create(name: "Pamela Halpert", email: "pam@dm.com")
member_three = Member.create(name: "Leslie Knope", email: "lknope@pawneeparks.gov")
member_four = Member.create(name: "Phoebe Bridgerton", email: "pbridge@eng.com")
member_five = Member.create(name: "John Diggle", email: "jdig@argus.net")
member_six = Member.create(name: "Barry Allen", email: "flash@theflash.org")
member_seven = Member.create(name: "Hermione Granger", email: "hgrang@mom.wiz")
member_eight = Member.create(name: "Olivia Pope", email: "pope@scandal.law")
member_nine = Member.create(name: "Dory Fish", email: "psherman42@wallaby.way")
member_ten = Member.create(name: "Nala Knowles", email: "boss@priderock.den")

check_in_one = CheckIn.create(score: 4, comment: "I felt pretty good today but didn't stick perfectly to my rest blocks.", member: member_four)
check_in_two = CheckIn.create(score: 2, comment: "I haven't been getting sleep lately and it took a toll today.", member: member_one)
check_in_three = CheckIn.create(score: 5, comment: "I had support group today and feel very encouraged.", member: member_nine)
check_in_four = CheckIn.create(score: 3, comment: "There isn't anything too stressful today but I also had a lot of trouble focusing on accomplishing the goals I wanted to.", member: member_one)
check_in_five = CheckIn.create(score: 4, comment: "We went to an appointment today without any problems and received positive news. It's the small victories that are keeping me going.", member: member_six)

support1 = SupportGroup.create(name: "Adult Children of Alcoholics", topic: "n", meeting_day: "Sunday", location: "Houston,TX")
support2 = SupportGroup.create(name: "Alcoholics Anonymous", topic: "n", meeting_day: "Monday", location: "Houston,TX")
support3 = SupportGroup.create(name: "Alzheimer's Association", topic: "n", meeting_day: "Tuesday", location: "Houston,TX")
support4 = SupportGroup.create(name: "Autism Society of America", topic: "n", meeting_day: "Wednesday", location: "Houston,TX")
support5 = SupportGroup.create(name: "Caregiver Action Network", topic: "n", meeting_day: "Thursday", location: "Houston,TX")
support6 = SupportGroup.create(name: "The Compassionate Friends Grief Support", topic: "n", meeting_day: "Friday", location: "Houston,TX")
support7 = SupportGroup.create(name: "Crisis Text Line", topic: "n", meeting_day: "Saturday", location: "Houston,TX")
support8 = SupportGroup.create(name: "Emotions Anonymous", topic: "n", meeting_day: "Sunday", location: "Houston,TX")
support8 = SupportGroup.create(name: "Gamblers Anonymous", topic: "n", meeting_day: "Monday", location: "Houston,TX")
support10 = SupportGroup.create(name: "Well Spouse Association", topic: "n", meeting_day: "Tuesday", location: "Houston,TX")

membership_one = Membership.create(member: member_one, support_group: support5)
membership_two = Membership.create(member: member_two, support_group: support2)
membership_three = Membership.create(member: member_one, support_group: support1)
membership_four = Membership.create(member: member_four, support_group: support3)
membership_five = Membership.create(member: member_five, support_group: support4)
membership_six = Membership.create(member: member_seven, support_group: support2)
membership_seven = Membership.create(member: member_eight, support_group: support8)
membership_eight = Membership.create(member: member_nine, support_group: support7)
membership_nine = Membership.create(member: member_ten, support_group: support10)
membership_ten = Membership.create(member: member_six, support_group: support6)