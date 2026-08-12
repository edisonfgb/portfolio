import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TemplatePortal } from '@angular/cdk/portal';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@core/services/language.service';
import { FabService } from '@core/services/fab.service';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { GetProjectsUseCase } from '@shared/data-access/project/get-projects.use-case';
import { ProjectModel } from '@shared/data-access/project/project.model';
import { GetEducationUseCase } from '@features/home/services/education/get-education.use-case';
import { EducationModel } from '@features/home/services/education/education.model';
import { GetSkillsUseCase } from '@features/home/services/skill/get-skills.use-case';
import { SkillModel } from '@features/home/services/skill/skill.model';
import { ErrorResponseDTO } from '@shared/data-access/error-base-response.schema';
import {
  ScrollFabComponent,
  ScrollFabSection
} from './scroll-fab/scroll-fab.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollFabComponent, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fabTemplate') private readonly fabTemplateRef!: TemplateRef<unknown>;

  private readonly languageService = inject(LanguageService);
  private readonly translateService = inject(TranslateService);
  private readonly getProjects = inject(GetProjectsUseCase);
  private readonly getEducation = inject(GetEducationUseCase);
  private readonly getSkills = inject(GetSkillsUseCase);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fabService = inject(FabService);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly translationsChanged = toSignal(this.translateService.onLangChange, {
    initialValue: null
  });

  protected readonly projects = signal<ProjectModel[]>([]);
  protected readonly projectsLoading = signal(true);
  protected readonly projectsError = signal<ErrorResponseDTO | null>(null);
  protected readonly sortedProjects = computed(() =>
    [...this.projects()].sort((a, b) => a.order - b.order)
  );

  protected readonly education = signal<EducationModel[]>([]);
  protected readonly educationLoading = signal(true);
  protected readonly educationError = signal<ErrorResponseDTO | null>(null);
  protected readonly sortedEducation = computed(() =>
    [...this.education()].sort((a, b) => a.order - b.order)
  );

  protected readonly skills = signal<SkillModel[]>([]);
  protected readonly skillsLoading = signal(true);
  protected readonly skillsError = signal<ErrorResponseDTO | null>(null);
  protected readonly sortedSkills = computed(() =>
    [...this.skills()].sort((a, b) => a.order - b.order)
  );

  protected readonly fabSections = computed<ScrollFabSection[]>(() => {
    this.translationsChanged();
    return [
      { id: 'projects', label: this.translateService.instant('home.projectsLabel') },
      { id: 'skills', label: this.translateService.instant('home.skillsLabel') },
      { id: 'education', label: this.translateService.instant('home.educationLabel') },
      { id: 'contact', label: this.translateService.instant('home.contactLabel') }
    ];
  });

  constructor() {
    effect(
      () => {
        this.languageService.language();
        this.loadProjects();
        this.loadEducation();
        this.loadSkills();
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    const portal = new TemplatePortal(this.fabTemplateRef, this.viewContainerRef);
    this.fabService.set(portal);
  }

  ngOnDestroy(): void {
    this.fabService.clear();
  }

  protected retryProjects(): void {
    this.loadProjects();
  }

  protected retryEducation(): void {
    this.loadEducation();
  }

  protected retrySkills(): void {
    this.loadSkills();
  }

  private loadProjects(): void {
    this.projectsLoading.set(true);
    this.projectsError.set(null);
    this.getProjects
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.projects.set(result);
          this.projectsLoading.set(false);
        },
        error: (err: ErrorResponseDTO) => {
          this.projectsError.set(err);
          this.projectsLoading.set(false);
        }
      });
  }

  private loadEducation(): void {
    this.educationLoading.set(true);
    this.educationError.set(null);
    this.getEducation
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.education.set(result);
          this.educationLoading.set(false);
        },
        error: (err: ErrorResponseDTO) => {
          this.educationError.set(err);
          this.educationLoading.set(false);
        }
      });
  }

  private loadSkills(): void {
    this.skillsLoading.set(true);
    this.skillsError.set(null);
    this.getSkills
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.skills.set(result);
          this.skillsLoading.set(false);
        },
        error: (err: ErrorResponseDTO) => {
          this.skillsError.set(err);
          this.skillsLoading.set(false);
        }
      });
  }
}