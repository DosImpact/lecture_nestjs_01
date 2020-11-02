import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach 각각의 테스트마다 app을 생성 , 만들어둔 data사라짐
  // beforeAll  하나만 app만 사용, 테스트후에도 데이터 유지  
  // - pipe line 도 똑같이 적용해야함
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // @가 붙은 type만 인자로 들어옴 (애러발생 x, 암묵적으로 제거됨, 제거된 subset)
        forbidNonWhitelisted: true, // @가 붙은 key 외의 데이터가 들어오면 애러
        transform: true, // param의 string 을 number로
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!!!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get("/movies/all")
        .expect(200)
        .expect([]);
    })

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies/1')
        .send({
          title: "test",
          year: 2020,
          genres: ['genres01']
        })
        .expect(201)
    })

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    })

  })


  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get("/movies/100")
        .expect(404);
    });
    // 귀여운 연필 아이콘으로 할것들을 미리 기록해준다.
    it("PATCH ", () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({
          title: "updated Title"
        }).expect(200);
    })
    it("DELETE ", () => {
      return request(app.getHttpServer())
        .delete("/movies/1")
        .expect(200);
    })
    it('GET', () => {
      return request(app.getHttpServer())
        .get("/movies/all")
        .expect(200)
        .expect([]);
    })
  })
});
