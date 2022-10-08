# Change Log

## v1.0.0

- RelaseDate: 2022.02.15
- Feature:
  1. Order CRUD
  2. Zone CRUD
  3. User CRUD
  4. Login
  5. Sign up
  6. Search zone by Tracking Number from order
  7. Search Google map by Lonlat or PlaceName
  8. Navigate order to google map in the table
  9. Upload order from template

## v1.1.0

- RelaseDate: 2022.03.22
- Feature:
  1. Upload order from simple/standar template
  2. Search order by updated date
- Improvement:
  1. Searching speed
  2. Backend perf
  3. Move "add order" function into new single page
- Bug fix:
  1. Searching error tracking number may cause crash

## v1.2.0

- RelaseDate: 2022.03.31
- Feature:
  1. Download order, according to search result by updated data
  2. Show all the order data
  3. After searching tracking number, will show the order's description
- Improvement:
  1. Backend response speed
- Bug fix:
  1. Edit order popup might can not show

## v2.0.0

- RelaseDate: 2022.07.23
- Feature:
  1. refactor, change map api to backend
  2. add go to view button when search by tracking number
- Improvement:
  1. Backend response speed
- Bug fix:

## v2.0.1

- RelaseDate: 2022.07.28
- Feature:
  1. add new order into list when post successfull
- Improvement:
  1. Backend response speed
  2. Add order by excel speed up
- Bug fix:
  1. Backend order entity expiredDate nullable

## v2.1.0

- RelaseDate: 2022.08.23
- Feature:
  1. add barcode scanner in search trackingNumber by camera
  2. add search TrackingNumberList
  3. add template download
- Improvement:
  1. UI/UX
- Bug fix:
  1. search "" in trackingNumber will trigger api call

## v2.2.0

- RelaseDate: 2022.09.25
- Feature:
  1. add Rule for auto pick
  2. add Backend check
  3. add login by accountId
  4. add post measure Data and Image
- Improvement:
  1. UI/UX
  2. Temp Remove scan by camera
  3. improve search TrackingNumberList

## v2.2.1

- RelaseDate: 2022.10.08
- Improvement:
  1. Change Map Service back to Google, continue using GeoCoding service to find place
