# DevOps CI/CD Lab

A place to actually run the DevOps tools instead of just reading about them.

The application is deliberately boring — one Express endpoint that returns a string.
Everything worth looking at is around it: how the code gets analysed, containerised,
deployed and monitored. I set each tool up properly and got it working locally, rather
than copying a config I'd never run.

## What's in here

**Jenkins** — a pipeline that resolves the SonarQube scanner, checks out the branch,
and runs static analysis with the token pulled from Jenkins credentials rather than
hard-coded. Windows agent, so the steps are `bat`.

**Docker** — an image for the app, plus a Compose file that mounts the source for hot
reload while keeping `node_modules` in the container.

**Kubernetes** — a Deployment running three replicas behind a NodePort Service, tested
on minikube.

**Terraform** — the Docker provider pulling `node:18-alpine` and running the container
with the port mapping declared in code.

**Prometheus** — a scrape config collecting metrics from the Jenkins controller.

## Running it

```bash
git clone https://github.com/salmenhammami/DevOps.git
cd DevOps

npm install && npm start      # http://localhost:6969
docker compose up -d --build  # or with Docker

minikube start                # or on Kubernetes
kubectl apply -f deployment.yaml -f service.yaml

cd terraform && terraform init && terraform apply
```

For the pipeline, Jenkins needs a scanner installation named `MySonarScanner`, a
SonarQube server named `projet`, and a secret-text credential with the ID `sonarqube`.

## Where it stops

The pipeline ends at static analysis. There's no test stage because the app has no
tests, no quality gate that fails the build, and no build-and-push stage — so the
image the Kubernetes manifests expect is one I push by hand. Closing those gaps is
the next thing I want to do here, along with making the pipeline run on Linux agents.

---

**Salmen Hammami** · [GitHub](https://github.com/salmenhammami) · [LinkedIn](https://www.linkedin.com/in/salmenhammami/)
