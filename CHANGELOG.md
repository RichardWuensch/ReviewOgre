# Changelog

## [Released]

## [2.0.0] - 2023-09-07

## Added
- developers docu
- user docu
- tooltip with direct link to the correct part of the user docu
- participant import for ilias exports
- international Groups as option for the algorithm
- unittests
- copyright headers

## Changed
- add the review dates on the resultpage
- .txt exports only opened in a new browser tab - no direct download
- better error description by participant import 

## Fixed
- usability of the DragNDrop functionality

## Removed

## [2.0.0beta] - 2023-08-15

## Added
- participantlist at the result page is ordered by fairness score
- icons to show fairness issues

## Changed

## Fixed
- path of the SVG imports
## Removed

## [1.2.0] - 2023-08-15

## Added
- User Docs
- Developer.md
- cypress tests
- switch for result page view (old and dragndrop)
- room plan as matrix available

## Changed

## Fixed
- distribution of the reviewer role - swap if necessary

## Removed

## [2.0.0alpha] - 2023-08-03

## Added
- Drag-and-Drop
- Updated Review View
- Draggable Participant list

## Changed
- Review description

## Fixed

## Removed
- old Result page

## [1.1.1] - 2023-08-03

## Added
- Pre-Import Modal to check the imported data
- Checks for creating participant. Can't create empty ones anymore
- Importing of 'simple' csv data now possible
- Overlapping timeslots will be flagged instantly
- Preview modals shows the data found in the imported file
- Precheck of data if there is a possibility for the algorithm to find a solution
- "Save/Load Configuration" is now "Save/Load State", with or without the calculated Reviews
- Configuration files from Version [1.0.0] can be imported too

## Changed
- Moved navbar items to the right

## Fixed
- Overlapping items in the slotList on certain screen ratios
- Overlapping items in 'settings'-button
- Active tab highlighted in navbar
- Overlapping Slots and invalid times now show an error

## Removed
- Sample data in tables

## [1.0.0] - 2023-07-13

## Added
- OffCanvas for export options
- Router
- Result page
- Docs page
- Navbar
- Analytics for participant
- Date overlap checking when creating a new slot

## Changed
- Styling of export options
- Moved settings into modal
- Stored settings into context
- Moved import into  navbar
- Naming of some text changed

## Fixed
- Font issues
- Overlapping in participant list in certain screen ratios

## Removed
- Successful calculation modal

## [0.1.1] - 2023-05-01

## Added

- Landing page (main window)
- Display all slots rooms in main window
- Modal 'edit slots and rooms'
- Modal 'delete slot/room'
- show slot/room from store in frontend
- Modal 'edit participant'
- Display all participants in main window
- Modal 'add participant'
- Modal 'delete participant'
- Delete multiple participants simultaneously
- Central store for participants, slots and rooms
- Helper methods for store access
- Use the stored data in the frontend
- Static data inspection before the algorithm runs
- Combined the frontend with the algorithm
- Merge algorithm from technical mockup
- Modal 'successful calculation'
- A/B-Review
- create Room allocation plan from result
- create result mail for participants
- Load a RevOger-File
- Store a RevOger-File
- Parse Studentlist(csv)
- Changelog
- Bootstrap

## Changed
- Rooms: hasBeamer --> beamerNeeded
- Refactor main
- Refactor algorithm

## Fixed
- Fix font issues
- Change project template to PWA

## Removed
- test run with dummy data