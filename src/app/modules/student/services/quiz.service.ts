import { Injectable } from '@angular/core';
import { QuizQuestion, QuizQuestionsService } from '../../../repositories/quiz-questions.service';
import { AuthService } from '../../../services/auth.service';
import { forkJoin, of, switchMap, map } from 'rxjs';
import { Answer, AnswersService } from '../../../repositories/answers.service'; // Make sure this is imported
import { Question, QuestionsRepoService } from '../../../repositories/questions-repo.service';

export type Questions = {
  quizQuestion: QuizQuestion;
  question: Question[];
  options: Answer[];
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private quizQuestionRepo: QuizQuestionsService,
    private questionRepo: QuestionsRepoService,
    private authService: AuthService,
    private answersRepo: AnswersService // 👈 Inject your answers repo here
  ) { }

  getQuestions(quizId: number) {
    return this.quizQuestionRepo.get({
      quiz_id: quizId
    }).pipe(
      switchMap(questions => {
        const questionWithAnswers$ = questions.map(question =>
          forkJoin({
            quizQuestion: of(question),
            question: this.questionRepo.get({ id: question.question_id }),
            options: this.answersRepo.get({ question_id: [question.question_id] }) // 👈 Assuming this is how you query answers
          })
        );

        return forkJoin(questionWithAnswers$); // Returns Questions[]
      })
    );
  }
}
